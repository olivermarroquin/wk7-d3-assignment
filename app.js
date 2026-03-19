"use strict";

const searchForm = document.getElementById("searchForm");
const topicInput = document.getElementById("topic");
const toneInput = document.getElementById("tone");
const statusText = document.getElementById("status");
const resultText = document.getElementById("results");

async function main(event) {
  try {
    event.preventDefault();
    const topic = topicInput.value.trim();
    const tone = toneInput.value.trim();
    console.log("Form submitted");
    console.log("Topic:", topic);
    console.log("Tone:", tone);
    // console.log(event);
  } catch (error) {
    console.error(error);
  }
}

searchForm.addEventListener("submit", main);
