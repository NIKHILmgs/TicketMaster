import Tables from "./Tables";

export default function Favourites() {
  const favs = JSON.parse(localStorage.getItem("fav"));

  return (
    <div className="">
      {!favs || favs.length === 0 ? (
        <p>This is your favourites page</p>
      ) : (
        <Tables isFav favs={favs} />
      )}
    </div>
  );
}
