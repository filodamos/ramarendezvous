import axios from "axios";

export async function fetchData() {
  console.time("fetchTime");
  const response = await fetch(
    "http://127.0.0.1:8000/repos/EleftheriaEkatommati",
  );
  console.timeLog("fetchTime", "Received response");

  // Check if the response is OK (status 200)
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const json = await response.json();
  return json;
}

export async function prFetchData() {
  return axios.get('http://127.0.0.1:8000/repos/EleftheriaEkatommati')
}

export async function createRepo() {
  return axios.post("http://127.0.0.1:8000/repos/EleftheriaEkatommati");
}
