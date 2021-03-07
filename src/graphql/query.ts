export const LaunchesQuery = `
query LaunchesPast($limit: Int, $offset: Int) {
  launchesPast(limit: $limit, offset: $offset) {
    id
    mission_name
    rocket {
      rocket_name
    }
    launch_success
    launch_date_unix
    links {
      video_link
    }
  }
}
`;

export const LaunchQuery = `
  query LaunchQuery($id: ID!) {
    launch(id: $id) {
      mission_name
      details
      launch_success
      launch_date_unix
      links {
        video_link
        flickr_images
      }
    }
  }
`;