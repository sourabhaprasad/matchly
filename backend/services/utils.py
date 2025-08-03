import re

def sanitize_prompt_input(value: str) -> str:
    """Clean up user-provided input for prompt injection safety."""
    value = value.strip()
    value = re.sub(r"[`\"'<>]", "", value)
    value = re.sub(r"\s+", " ", value)
    return value
