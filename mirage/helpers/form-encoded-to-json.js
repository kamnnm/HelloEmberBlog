export default function formEncodedToJson(encoded) {
  let result = {};
  encoded.split("&").forEach(function(part) {
    let item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
