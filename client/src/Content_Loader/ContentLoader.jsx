import ContentLoader from "react-content-loader";

function MyContentLoader(){
    <ContentLoader
    speed={2}
    width={320}
    height={200}
    viewBox="0 0 320 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="320" height="180" />
    <rect x="0" y="190" rx="4" ry="4" width="200" height="16" />
    <rect x="0" y="210" rx="4" ry="4" width="150" height="12" />
  </ContentLoader>
}

export default MyContentLoader;