"use Client";

import { useRouter } from "next/router";
import Details from "../../../Components/Details";

export default function movieDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="w-full flex flex-wrap h-full">
      <Details id={id} fetch="movie" />
    </div>
  );
}
