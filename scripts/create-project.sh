#!/bin/bash

# Function to validate input
validate_input() {
    local input=$1
    if [[ -z "$input" ]]; then
        echo "Error: Input cannot be empty."
        return 1
    fi
    # Check if input contains only alphanumeric characters and underscores
    if [[ ! "$input" =~ ^[a-zA-Z0-9_-]+$ ]]; then
        echo "Error: Invalid input. Use only alphanumeric characters, underscores, and hyphens."
        return 1
    fi
    return 0
}

# Function to replace text in files
replace_in_file() {
    local file=$1
    local old_project_name=$2
    local new_project_name=$3
    local old_scheme=$4
    local new_scheme=$5

    # Use sed to perform replacements
    sed -i "" \
        -e "s/$old_project_name/$new_project_name/g" \
        -e "s/$old_scheme/$new_scheme/g" \
        "$file"
}

# Main script
clear
echo "React Native Expo Project Cloner"
echo "--------------------------------"

# Get source project directory with fallback
while true; do
    read -p "Enter the full path to the source project directory (press Enter to use parent directory): " source_dir

    # If no input, use parent directory
    if [[ -z "$source_dir" ]]; then
        source_dir=$(dirname "$(pwd)")
    fi

    # Validate directory exists and contains an Expo project
    if [[ -d "$source_dir" ]] && [[ -f "$source_dir/app.json" ]]; then
        break
    else
        echo "Error: Invalid directory. Please ensure it's a valid Expo project directory."
    fi
done

# Get project name
while true; do
    read -p "Enter new project name: " new_project_name
    if validate_input "$new_project_name"; then
        break
    fi
done

# Get scheme
while true; do
    read -p "Enter new project scheme (e.g., com.example.projectname): " new_scheme
    if validate_input "$(echo "$new_scheme" | tr '.' '_')"; then
        break
    fi
done

# Determine parent directory
parent_dir=$(dirname "$source_dir")
destination_dir="$parent_dir/$new_project_name"

# Check if destination directory already exists
if [[ -d "$destination_dir" ]]; then
    echo "Error: Destination directory $destination_dir already exists."
    exit 1
fi

# Create destination directory
mkdir -p "$destination_dir"

# Copy files and folders, excluding node_modules and .idea
echo "Copying project files..."
rsync -av \
    --exclude "node_modules/" \
    --exclude ".idea/" \
    --exclude ".git/" \
    "$source_dir/" "$destination_dir/"

# Files to modify (add more as needed)
config_files=(
    "$destination_dir/app.json"
    "$destination_dir/package.json"
    "$destination_dir/app.config.js"
    "$destination_dir/babel.config.js"
)

# Get original project name and scheme from source project
original_project_name=$(basename "$source_dir")
original_scheme=$(grep -o "com\.[^\"']*" "$source_dir/app.json" | head -1)

# Replace project name and scheme in config files
for file in "${config_files[@]}"; do
    if [[ -f "$file" ]]; then
        replace_in_file "$file" "$original_project_name" "$new_project_name" "$original_scheme" "$new_scheme"
    fi
done

# Reinitialize git
cd "$destination_dir"
rm -rf .git
git init
git add .
git commit -m "Initial commit of $new_project_name"

echo "Project cloned successfully!"
echo "New project created at: $destination_dir"
