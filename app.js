"use strict";

const searchForm = document.getElementById("searchForm");
const topicInput = document.getElementById("topic");
const toneInput = document.getElementById("tone");
const statusText = document.getElementById("status");
const resultText = document.getElementById("results");

function renderError(message) {
  statusText.textContent = `Error: ${message}`;
  resultText.textContent = "";
}

function renderReady() {
  statusText.textContent = "Inputs Look Good";
  resultText.textContent = "";
}

function renderLoading() {
  statusText.textContent = "Loading...";
  resultText.textContent = "";
}

async function getKey() {
  try {
    const url = "https://proxy-key-yquj.onrender.com/get-key";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("Could not get API key");
    }
    const data = await res.json();
    return data.key;
  } catch (error) {}
}

async function callAI(topic, tone, key) {
  const proxyURL = "https://corsproxy.io/?url=";

  const workersEndpoint =
    "https://api.cloudflare.com/client/v4/accounts/83cf2c15a58cddcc9466f6057963dbf9/ai/run/@cf/meta/llama-3-8b-instruct";

  const url = proxyURL + workersEndpoint;

  const promptBody = {
    messages: [
      {
        role: "system",
        content: `You are a music store sales assistant. Respond in a ${tone} tone. Keep the answer short and focused on products.`,
      },
      {
        role: "user",
        content: `Tell me about ${topic} and what products you sell related to it.`,
      },
    ],
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(promptBody),
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Could not get AI response: ${errorText}`);
  }
  const data = await res.json();
  return data;
}

function renderSuccess(text) {
  statusText.textContent = "Success!";
  resultText.textContent = text;
}

async function main(event) {
  try {
    event.preventDefault();
    const topic = topicInput.value.trim();
    const tone = toneInput.value.trim();
    console.log("Form submitted");
    console.log("Topic:", topic);
    console.log("Tone:", tone);
    // console.log(event);

    if (!topic || !tone) {
      renderError("Please fill in both inputs");
      return;
    }
    renderReady();
    renderLoading();

    const key = await getKey();
    console.log("API key: " + key);

    const aiData = await callAI(topic, tone, key);
    // console.log("AI Data:", aiData);

    const responseText = aiData.result.response;
    renderSuccess(responseText);
  } catch (error) {
    console.error(error);
    renderError(error.message);
  }
}

searchForm.addEventListener("submit", main);
