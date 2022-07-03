import { CircularProgress, Link } from "@material-ui/core";
import React, { useEffect, useReducer, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Pokedetails from "../Pokedetails/Pokedetails";
import { Link as Bink } from "react-router-dom";
import Abilities from "../pages/Abilities";
import "./pokecard.css";
import { Star } from "../pages/styled";
import { useShows } from "../custom-hooks";

const PAGE_NUMBER = 0;

function PokeCard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(PAGE_NUMBER);
  const [img, setImg] = useState(1);
  const [likes, setLikes] = useReducer();

  const [starredPoke, dispachStarred] = useShows();

  useEffect(() => {
    // fetch(`https://pokeapi.co/api/v2/pokemon?limit=${page}&offset=0`)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`).then(
      (result) => {
        result.json().then((resp) => {
          // console.warn(resp);
          setData(resp.results);
        });
      }
    );
  }, [page]);
  console.log(data);

  function fetchMoreData() {
    setPage(page + 10);
  }

  function imgageFetch() {
    setImg(img + 1);
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="justify-content-center">
      <div className="search">
        <input
          className="searchbar"
          type="text"
          onChange={handleChange}
          placeholder="Search your Favourite Pokemon Here"
        ></input>
        <Bink
          to={`/starred`}
          // href={`https://pokeapi.co/api/v2/pokemon/${curElem.name}/`}
          className="btn btn-success button1"
        >
          Starred Pokemon
        </Bink>
      </div>
      <InfiniteScroll
        className=" d-flex flex-wrap justify-content-center mt-5"
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<CircularProgress color="success" />}
      >
        {data
          .filter((curElem, i) => {
            if (search == "") {
              return curElem;
            } else if (
              curElem.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return curElem;
            }
          })
          .map((curElem, i) => {
            const isStarred = starredPoke.includes(curElem.name);

            const onStarClick = () => {
              if (isStarred) {
                dispachStarred({
                  type: "REMOVE",
                  // pokeId: data.indexOf(curElem),
                  pokeId: curElem.name,
                });
              } else {
                dispachStarred({
                  type: "ADD",
                  // pokeId: data.indexOf(curElem),
                  pokeId: curElem.name,
                });
              }
            };

            return (
              <div className="p-3">
                <div className="row">
                  <div className="col-sm ">
                    <div
                      className="card border-2 rounded"
                      style={{ width: 300 }}
                      key={data.indexOf(curElem)}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                          data.indexOf(curElem) + 1
                        }.svg`}
                        className="card-img-top"
                        alt=""
                        height="200px"
                      />
                      <div className="card-body">
                        <h5 className="card-title text-capitalize">
                          {curElem.name}
                        </h5>
                        <p className="card-text"></p>
                        <Bink
                          // to={`pokemon/${curElem.name}`}
                          to={`pokemon/${data.indexOf(curElem) + 1}`}
                          // href={`https://pokeapi.co/api/v2/pokemon/${curElem.name}/`}
                          className="btn btn-success"
                        >
                          See Details
                        </Bink>
                        <button
                          type="button"
                          onClick={onStarClick}
                          className="button"
                        >
                          <Star active={isStarred} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </InfiniteScroll>
    </div>
  );
}

export default PokeCard;
