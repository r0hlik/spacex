export type Launch = {
  id: string;
  mission_name: string;
  rocket: { rocket_name: string };
  launch_success: boolean;
  launch_date_unix: number;
  links: { video_link: string };
}
