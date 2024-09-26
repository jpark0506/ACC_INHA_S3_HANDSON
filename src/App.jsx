import { useEffect, useState } from "react";
import "./App.css";
import StyledInput from "./input";
import Submit from "./submit";
import supabase from "./supabaseClient";
import Title from "./title";
import unsplash from "./upslash";
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [adminResult, setAdminResult] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onClick = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("user")
      .select("name")
      .eq("name", name);
    if (error || data.length === 0) {
      alert("사용자가 없습니다.");
      setIsLoading(false);
      return;
    }
    setUser(data[0].name);
    if (data[0].name === "박준혁") {
      getResults();
    }
    setIsLoading(false);
  };
  const onImageGame = async () => {
    if (isImageLoading) return;
    setIsImageLoading(true);

    const { data, error } = await supabase
      .from("game")
      .select("has_started")
      .eq("game", "acc-inha");
    if (!data[0].has_started) {
      alert("게임이 아직 시작되지 않았습니다.");
      setUrl("");
      setCount(0);
      setIsImageLoading(false);
      return;
    }

    if (!hasStarted) {
      setHasStarted(true);
    }

    const result = await unsplash.photos.getRandom({
      query: "people",
      count: 30,
      featured: true,
    });
    console.log(result);
    const url = result.response[Math.floor(Math.random() * 30)].urls.regular;
    setUrl(url);
    const { d, e } = await supabase
      .from("user")
      .update({ image_url: url })
      .eq("name", user);
    setIsImageLoading(false);
    setCount(count + 1);
  };
  const initGame = async () => {
    const { data, error } = await supabase
      .from("game")
      .update({ has_started: false })
      .eq("game", "acc-inha");
    for (let i = 0; i < adminResult.length; i++) {
      const { d, e } = await supabase
        .from("user")
        .update({ image_url: null })
        .eq("name", adminResult[i].name);
    }

    getResults();
  };
  const startGame = async () => {
    const { data, error } = await supabase
      .from("game")
      .update({ has_started: true })
      .eq("game", "acc-inha");
  };
  const getResults = async () => {
    const { data, error } = await supabase
      .from("user")
      .select("name, image_url")
      .neq("name", "박준혁");
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setAdminResult(data);
  };

  return (
    <>
      <Title />
      <h1>AWS Cloud Club Inha</h1>
      <div className="card">
        {user !== "" ? (
          user !== "박준혁" ? (
            <div>
              <h2>{`${user}님 환영합니다. 👏👏👏👏👏`}</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button onClick={onImageGame}>랜덤 이미지 게임 시작하기</button>
                {count !== 0 && <h3>{`${count}차 게임입니다.`}</h3>}
                {url !== "" ? (
                  isImageLoading ? (
                    <h3>이미지 로딩중...</h3>
                  ) : (
                    <img
                      style={{
                        height: "300px",
                        width: "300px",
                        objectFit: "cover",
                        margin: "30px",
                      }}
                      src={url}
                      alt="random"
                    />
                  )
                ) : null}
              </div>
            </div>
          ) : (
            <div>
              <h2>{`${user}님 환영합니다.`}</h2>
              <button
                onClick={startGame}
                style={{
                  marginRight: "20px",
                }}
              >
                게임 시작하기
              </button>
              <button
                onClick={initGame}
                style={{
                  marginRight: "20px",
                }}
              >
                게임 초기화
              </button>
              <button onClick={getResults}>결과 조회</button>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {adminResult.map((result) => {
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        style={{
                          height: "300px",
                          width: "300px",
                          objectFit: "cover",
                          margin: "30px",
                        }}
                        src={result.image_url}
                      />
                      <h3>{result.name}</h3>
                    </div>
                  );
                })}
              </div>
              {}
            </div>
          )
        ) : (
          <>
            <StyledInput
              value={name}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              isLoading={isLoading}
            />
            <Submit onClick={onClick} isLoading={isLoading} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
