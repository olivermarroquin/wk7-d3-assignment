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
  } catch (error) {
    console.error(error);
    renderError(error.message);
  }
}

searchForm.addEventListener("submit", main);
