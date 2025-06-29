const form= document.querySelector('.prompt-form');
const propmptInput = document.querySelector('.prompt-input');
const modelSelect = document.querySelector('modelSelect');

//form submit event listener

form.addEventListener('submit',async(e)=>{
    e.preventDefault();//stops page from refreshing
const prompt = promptInput.value;
const model = modelSelect.value;

if(!prompt || !model){
    alert('PLease enter a prompt and select a model');
}
  const output = document.createElement('div');
  output.innerHTML = `<p>Generating image for: <b>${prompt}</b><br>Please wait...</p>`;
  document.body.appendChild(output);

  const response = await fetch("https://api-inference.huggingface.co/models/" + model, {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY", // replace this
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });


});


