# 8. Privacy & Security (Plan)

- **Eyebrow:** PRIVACY BY DESIGN

## Heading
Understand where your project information goes.

## Body
Developers should be able to make informed decisions about how their project information is handled.

NexPath's privacy approach includes local handling of supported data, protections for stored information, and additional privacy-focused workflows through its internal device network.

## Items

1. **Local data handling**
   Supported local functionality can keep its associated data on your device rather than requiring repository uploads to NexPath.

2. **Secret redaction**
   Supported prompt-storage workflows can remove recognized secrets, such as API keys and tokens, before storing prompts.

3. **Control over local history**
   Manage or clear locally stored prompt history through the supported controls.

4. **Local-model inference**
   When Data Privacy Mode is enabled and correctly configured, supported model inference can be restricted to your internal device network.
   This helps developers use compatible local models for workflows that require greater control over external model API usage.

- **Important distinction:** Local storage, secret redaction, and local-model inference are different protections. Their guarantees should be documented separately so users understand what each feature does and what remains outside its scope.
