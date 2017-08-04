export default function(server) {
  server.createList('post', 3);
  server.createList('user', 1, 'registered');
}
