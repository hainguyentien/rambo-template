#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
PARENT_DIR="$(dirname "$TEMPLATE_DIR")"
TEMPLATE_NAME="$(basename "$TEMPLATE_DIR")"

require_non_empty() {
  local value="$1"
  local field="$2"

  if [[ -z "${value// }" ]]; then
    echo "Error: ${field} cannot be empty."
    return 1
  fi
}

to_slug() {
  local value
  value="$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-{2,}/-/g')"

  if [[ -z "$value" ]]; then
    value="app"
  fi

  printf '%s' "$value"
}

to_bundle_segment() {
  local value
  value="$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/_/g; s/^_+//; s/_+$//; s/_{2,}/_/g')"

  if [[ -z "$value" ]]; then
    value="app"
  fi

  printf '%s' "$value"
}

is_valid_bundle_id() {
  local value="$1"
  [[ "$value" =~ ^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z][A-Za-z0-9_]*)+$ ]]
}

escape_sed() {
  printf '%s' "$1" | sed -e 's/[\/&]/\\&/g'
}

copy_non_ignored_files() {
  local source_dir="$1"
  local destination_dir="$2"

  if ! command -v git >/dev/null 2>&1; then
    echo "Error: git is required to copy only non-ignored files."
    exit 1
  fi

  if ! command -v rsync >/dev/null 2>&1; then
    echo "Error: rsync is required to copy project files."
    exit 1
  fi

  if ! git -C "$source_dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Error: Template directory must be inside a git repository."
    exit 1
  fi

  (
    cd "$source_dir"
    git ls-files -z --cached --others --exclude-standard \
      | rsync -a --from0 --files-from=- ./ "$destination_dir/"
  )
}

update_app_config() {
  local file="$1"
  local app_name="$2"
  local slug="$3"
  local scheme="$4"
  local ios_bundle_id="$5"
  local android_package="$6"

  local app_name_esc slug_esc scheme_esc ios_bundle_esc android_package_esc
  app_name_esc="$(escape_sed "$app_name")"
  slug_esc="$(escape_sed "$slug")"
  scheme_esc="$(escape_sed "$scheme")"
  ios_bundle_esc="$(escape_sed "$ios_bundle_id")"
  android_package_esc="$(escape_sed "$android_package")"

  sed -i "" -E \
    -e "s/(name:[[:space:]]*)'[^']*'/\1'${app_name_esc}'/" \
    -e "s/(slug:[[:space:]]*)'[^']*'/\1'${slug_esc}'/" \
    -e "s/(scheme:[[:space:]]*)'[^']*'/\1'${scheme_esc}'/" \
    -e "s/(bundleIdentifier:[[:space:]]*)'[^']*'/\1'${ios_bundle_esc}'/" \
    -e "s/(package:[[:space:]]*)'[^']*'/\1'${android_package_esc}'/" \
    "$file"
}

update_package_name() {
  local file="$1"
  local package_name="$2"
  local package_name_esc

  package_name_esc="$(escape_sed "$package_name")"
  sed -i "" -E "s/(\"name\"[[:space:]]*:[[:space:]]*\")([^\"]+)(\")/\1${package_name_esc}\3/" "$file"
}

if [[ -t 1 ]] && command -v clear >/dev/null 2>&1; then
  clear
fi
echo "Create Project from Template"
echo "----------------------------"
echo "Template folder : ${TEMPLATE_DIR}"
echo "Destination root: ${PARENT_DIR}"
echo

while true; do
  read -r -p "Project folder name: " PROJECT_NAME
  require_non_empty "$PROJECT_NAME" "Project folder name" && break
done

while true; do
  read -r -p "App name (display name): " APP_NAME
  require_non_empty "$APP_NAME" "App name" && break
done

APP_SLUG="$(to_slug "$PROJECT_NAME")"
APP_SCHEME="$(to_slug "$APP_NAME")"
DEFAULT_BUNDLE_ID="com.teaser.$(to_bundle_segment "$APP_NAME")"

while true; do
  read -r -p "Bundle identifier [${DEFAULT_BUNDLE_ID}]: " BUNDLE_ID_INPUT
  BUNDLE_ID="${BUNDLE_ID_INPUT:-$DEFAULT_BUNDLE_ID}"
  if is_valid_bundle_id "$BUNDLE_ID"; then
    break
  fi
  echo "Error: Invalid bundle identifier. Example: com.teaser.my_app"
done

DEST_DIR="${PARENT_DIR}/${PROJECT_NAME}"
APP_CONFIG_FILE="${DEST_DIR}/app.config.ts"
PACKAGE_JSON_FILE="${DEST_DIR}/package.json"
ANDROID_PACKAGE="$(echo "$BUNDLE_ID" | tr '[:upper:]' '[:lower:]' | sed -E 's/-+/_/g; s/[^a-z0-9._]/_/g')"

if [[ "$DEST_DIR" == "$TEMPLATE_DIR" ]]; then
  echo "Error: Destination cannot be the current template directory (${TEMPLATE_NAME})."
  exit 1
fi

if [[ -e "$DEST_DIR" ]]; then
  echo "Error: Destination already exists: $DEST_DIR"
  exit 1
fi

echo
echo "Configuration summary"
echo "- Project folder : ${PROJECT_NAME}"
echo "- App name       : ${APP_NAME}"
echo "- Slug           : ${APP_SLUG}"
echo "- Scheme         : ${APP_SCHEME}"
echo "- iOS bundle ID  : ${BUNDLE_ID}"
echo "- Android package: ${ANDROID_PACKAGE}"
echo "- Destination    : ${DEST_DIR}"
echo

read -r -p "Continue? [y/N]: " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

mkdir -p "$DEST_DIR"
copy_non_ignored_files "$TEMPLATE_DIR" "$DEST_DIR"

if [[ ! -f "$APP_CONFIG_FILE" ]]; then
  echo "Error: app.config.ts not found in destination: $APP_CONFIG_FILE"
  exit 1
fi

update_app_config "$APP_CONFIG_FILE" "$APP_NAME" "$APP_SLUG" "$APP_SCHEME" "$BUNDLE_ID" "$ANDROID_PACKAGE"

if [[ -f "$PACKAGE_JSON_FILE" ]]; then
  update_package_name "$PACKAGE_JSON_FILE" "$APP_SLUG"
fi

echo
echo "Project created successfully."
echo "Location: $DEST_DIR"
echo "Template remains unchanged at: $TEMPLATE_DIR"
