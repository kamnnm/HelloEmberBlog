export default function(server) {
  server.createList('post', 4);
  server.createList('user', 1, 'registered');
}
