const form = document.querySelector('.prompt-form');
const promptInput = document.querySelector('.prompt-input');
const modelSelect = document.getElementById('modelSelect');

// form submit event listener
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // stops page from refreshing

  const prompt = promptInput.value;
  const model = modelSelect.value;

  if (!prompt || !model) {
    alert('Please enter a prompt and select a model');
    return;
  }

  const output = document.createElement('div');
  output.innerHTML = `<p>Generating image for: <b>${prompt}</b><br>Please wait...</p>`;
  document.body.appendChild(output);

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/" + model, {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY", // Replace this
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) throw new Error("Image generation failed");

    const blob = await response.blob();
    const imgURL = URL.createObjectURL(blob);

    const img = document.createElement("img");
    img.src = imgURL;
    img.alt = prompt;
    img.style = "max-width: 100%; margin-top: 20px; border-radius: 8px;";

    output.innerHTML = '';
    output.appendChild(img);

  } catch (err) {
    output.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
});
