import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import fetchProfileQuery from "../../queries/fetchProfileQuery.js";
import fetchFollowingQuery from "../../queries/fetchFollowingQuery.js";
import Profile from "../../components/Profile.js";
import Post from "../../components/Post.js";

export default function ProfilePage() {
  const router = useRouter();
  const { ownedBy } = router.query;
  console.log(router);
  console.log(router.query);

  console.log("fetching profile for", ownedBy);
  // const { loading, error, data } = useQuery(fetchProfileQuery, {
  //   variables: {
  //     request: { profileId: id },
  //     publicationsRequest: {
  //       profileId: id,
  //       publicationTypes: ["POST"],
  //     },
  //   },
  // });

  // if (loading) return "Loading..";
  // if (error) return `Error! ${error.message}`;

  // const { loading2, error2, data2 } = useQuery(followers, {
  //   variables: {
  //     request: { profileId: id },
  //     // publicationsRequest: {
  //     //   profileId: id,
  //     //   publicationTypes: ["POST"],
  //     // },
  //   },
  // });
  const { loading, error, data } = useQuery(fetchFollowingQuery, {
    variables: {
      request: {
        address: process.env.NEXT_PUBLIC_INITIAL_WALLET, // Albert @thatguyintech
        limit: process.env.NEXT_PUBLIC_LENSAPI_QUERY_LIMIT,
      },
    },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log(data);
  // return (
  //   <div className="flex flex-col p-8 items-center">
  //     <Profile profile={data.profile} displayFullProfile={true} />
  //     {data.publications.items.map((post, idx) => {
  //       return <Post key={idx} post={post} />;
  //     })}
  //   </div>
  // );
}
