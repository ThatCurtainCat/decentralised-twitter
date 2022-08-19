import { useQuery } from "@apollo/client";
import recommendedProfilesQuery from "../queries/recommendedProfilesQuery.js";
import Profile from "../components/Profile.js";
import UAuth from "@uauth/js";

const uauth = new UAuth({
  clientID: "fd8290ec-5042-4ced-8bf5-baf16ee3e95b",
  redirectUri: "http://localhost:5000/callback",
  scope: "openid wallet",
});

const login = async () => {
  try {
    const authorization = await uauth.loginWithPopup();
    console.log(authorization);
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  await uauth.logout();
  console.log("Logged out with Unstoppable");
};

export default function Home() {
  const { loading, error, data } = useQuery(recommendedProfilesQuery);

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <button onClick={login}>Login with Unstoppable</button>
      <button onClick={logout}>Logout Unstoppable</button>
      {data.recommendedProfiles.map((profile, index) => {
        console.log(`Profile ${index}:`, profile);
        return (
          <div>
            <Profile
              key={profile.id}
              profile={profile}
              displayFullProfile={false}
            />
          </div>
        );
      })}
    </div>
  );
}
