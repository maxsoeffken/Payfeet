export default function Home() {
  return null; // wird nie gerendert wegen Redirect
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/feed', // immer auf /feed weiterleiten
      permanent: false,
    },
  };
}
