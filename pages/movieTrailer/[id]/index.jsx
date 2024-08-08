import { useRouter } from "next/router";
import YoutubePlayer from "../../../Components/YoutubePlayer";

export default function showMovieTrailer() {
  const router = useRouter();
  const { id } = router.query;
  const { movieDetails } = router.query;

  return (
    <div className="w-full flex flex-wrap h-full">
      <YoutubePlayer videoId={id} searchParams={movieDetails} />
    </div>
  );
}
