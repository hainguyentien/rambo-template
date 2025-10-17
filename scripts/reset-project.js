import { createRequire } from 'module';

const require = createRequire(import.meta.url);

#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const oldDirs = ['app', 'components', 'hooks', 'constants', 'scripts'];
const newDir = 'app-example';
const newAppDir = 'app';
const newDirPath = path.join(root, newDir);

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
};
