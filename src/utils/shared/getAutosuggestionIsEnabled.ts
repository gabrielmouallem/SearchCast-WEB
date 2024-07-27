export function getAutosuggestionIsEnabled() {
  const rawEnvValue = process.env.NEXT_PUBLIC_AUTOSUGGEST_ENABLED;
  if (!rawEnvValue) return false;
  if (rawEnvValue === "true") return true;
  if (rawEnvValue === "false") return false;
  return false;
}
