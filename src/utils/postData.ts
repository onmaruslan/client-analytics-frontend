export function fetchData(api: string, dataJson: string) {
  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: dataJson,
  }).then((response) => response.json())
    .then((responseJson) => console.log(responseJson))
    .catch((e) => {
      console.error(`Could not fetch ${api}, error: ${e}`);
    });
}