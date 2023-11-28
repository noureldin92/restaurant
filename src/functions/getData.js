export async function getData() {
  let primaryFetch = await fetch("http://localhost:3000/meals");
  let finalData = await primaryFetch.json();

  if (!primaryFetch.ok) {
    throw new Error("Faild To Fetch Data");
  } else return finalData;
}
