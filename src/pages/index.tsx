import Image from 'next/image';

const HomePage = (): JSX.Element => {
  return (
    <div className="text-center">
      <h1 className="m-5 p-2 text-center text-lg">Hasura NextJS Apollo Client</h1>
      <Image
        src={`/images/nextjs-serverless-now-hasura-graphql.webp` as any}
        alt="Picture of the author"
        width="1000"
        height="500"
      />
    </div>
  );
};

export default HomePage;
