# Clean Quasar (clean-quasar)

Before installation you will need:

1. `Node` - version >= 16 (use NVM)
2. `NVM` - recommended Node Version Manager https://github.com/nvm-sh/nvm
3. `VSCode` - recommended file editor https://code.visualstudio.com/download
4. `yarn` - recommended package manager `npm install --global yarn`

Recommended VScode extensions:

1. `ESlint` - code analyzer for VScode https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
2. `Prettier` - code Formater for VScode https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
3. `EditorConfig` - override user/workspace settings with settings found in .editorconfig files https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
4. `Volar` - Language Support for Vue 3 https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar

### NVM Helper

```bash
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
local node_version="$(nvm version)"
local nvmrc_path="$(nvm_find_nvmrc)"



if [ -n "$nvmrc_path" ]; then
local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")



if [ "$nvmrc_node_version" = "N/A" ]; then
nvm install
elif [ "$nvmrc_node_version" != "$node_version" ]; then
nvm use
fi
elif [ "$node_version" != "$(nvm version default)" ]; then
echo "Reverting to nvm default version"
nvm use default
fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Installation

```bash
yarn
```

## Development

Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

## Commit standard

Commit Message Header in the following format:
https://github.com/conventional-changelog/commitlint

```js
<type>(<scope>): <short summary> [<JIRA TaskID>]
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: map|avatar|leaderboard|notifications|announcements|common|
  │                          users|learningObjects|skills|pushNotifications etc.
  │
  │
  └─⫸ Commit Type: fix|feat|perf|breaking|build|ci|chore|docs|other|refactor|revert|style|test
```

Where `type` is one of the following:

- `fix`
- `feat`
- `perf`
- `breaking`
- `build`
- `ci`
- `chore`
- `docs`
- `other`
- `refactor`
- `revert`
- `style`
- `test`

## Release

When a release is ready, run one of the following commands:

```bash
# Create major version (1.0.0)
yarn release:major
# or minor version (0.1.0)
yarn release:minor
# or patch version (0.0.1)
yarn release:patch
```

# Clean Quasar (clean-quasar)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

Easy to understand and maintain.
Reduce cognitive power.
rsdi

dao exception
domain exception
view layer exception

### Code Standards

https://github.com/conventional-changelog/commitlint
https://github.com/lob/generate-changelog
