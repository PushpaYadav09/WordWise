async function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (data.title) {
      resultDiv.innerHTML = `<p>❌ ${data.message}</p>`;
      return;
    }

    const meaning = data[0].meanings[0];
    const definition = meaning.definitions[0].definition;
    const example = meaning.definitions[0].example || "No example available.";
    const partOfSpeech = meaning.partOfSpeech;
    const phonetic = data[0].phonetic || "Not available";

    resultDiv.innerHTML = `
      <h2>${data[0].word}</h2>
      <p><strong>Phonetic:</strong> ${phonetic}</p>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Example:</strong> ${example}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    console.error(error);
  }
}
