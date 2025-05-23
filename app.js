const getUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
};




 const cont = document.querySelector("section");

 const inputName = document.querySelector("input");
 let value = inputName.value;
 let value1;

getUrl("https://pokeapi.co/api/v2/pokemon?limit=100").then((data) => {
  let pokemon = data.results;

  pokemon.forEach((el) => {
    const div = document.createElement("div");
    getUrl(el.url).then((pokemonnkar) => {
      let nkar = pokemonnkar.sprites.front_default;
      const img = document.createElement("img");
      img.src = nkar;

      div.append(img);

      for (let elem in el) {
        if (elem === "name") {
          const p = document.createElement("p");
          p.innerText = elem + ":" + el[elem];
          div.append(p);
        }
      }
      const p = document.createElement("label");
      p.innerText = "#" + pokemonnkar.id;
      div.append(p);
      cont.append(div);
    });
  });
  cont.addEventListener("click", (event) => {
    let pokemon = data.results;
    pokemon.forEach((el) => {
      let x = [event.target.parentElement.childNodes[1].innerText][0]; 
       cont.style.background = ''
      for (let elem in el) {

        if (elem === "name" && x === "name:" + el[elem]) {
          cont.innerHTML = "";
          getUrl(el.url).then((pokemonnkar) => {
            console.log(pokemonnkar);
            const div = document.createElement("div");
            const poqrdiv = document.createElement('div')
            poqrdiv.style = `
                width: 100%;
                margin-top:10%;
                display: grid;
                grid-template-columns: repeat(2,1fr);
                background:#5555ff;
            `

            for (let nk in pokemonnkar) {
              if (nk === 'height' || nk === 'weight') {
                const text = document.createElement('label')

                text.innerHTML = `
                    <h6>${nk.toUpperCase()}</h6>
                    <br>
                    <h4">${pokemonnkar[nk]}</h4>
                    `
                poqrdiv.append(text)

              } else if (nk === 'abilities') {
                const text = document.createElement('label')
                console.log();

                text.innerHTML = `
                  <h6>${nk.toUpperCase()}</h6>
                  <br>
                  <h4">${pokemonnkar[nk][0].ability.name.toUpperCase()}</h4>
                  `
                poqrdiv.append(text)
              }

            }
            getUrl(pokemonnkar.species.url).then(evol => {
              console.log(evol);
              const obshidiv = document.createElement("div");
              obshidiv.style = `
                width: 50%;
                height:100%;
                display: flex;
                flex-direction:column;
            `
            const h3  = document.createElement('h3')
            h3.innerText = 'Evolutions'

              const info = document.createElement('label')
              info.innerText = evol.flavor_text_entries[1].flavor_text

              const text = document.createElement('label')
              for (let gen of evol.genera) {
                   if (gen.language.name === 'en') {
                            text.innerHTML = `
                  <h6>Category</h6>
                  <br>
                  <h4">${gen.genus.toUpperCase()}</h4>
                  `
                   }
              }
      
              obshidiv.append(info)
              poqrdiv.append(text)
              obshidiv.append(poqrdiv)
              div.append(obshidiv)
               cont.append(h3)

              getUrl(evol.evolution_chain.url).then(evolfoto => {
              let arr = []
                  const evoldiv = document.createElement('div')
                evoldiv.style = `
                width: 80%;
                margin-left:10% ;
                display: grid;
               grid-template-columns: repeat(3, 1fr);
                flex-direction: row;
                gap:20px;
                `
               

              
              function foo(obj) {
                for (let el in obj) {
                if (el=== 'species') {
                  arr.push(obj[el].url)
                }else if (el==='evolves_to') {
                  for (let i = 0; i <obj[el].length; i++) {
                    foo(obj[el][i])
                    console.log(obj[el]);                 
                  } 
                } 
                }
              }


              foo(evolfoto.chain)
              
              arr = arr.reverse()

                for (let i = 0; i < arr.length; ) {
                  getUrl(arr[i]).then(eval=>{

                    getUrl(eval.varieties[0].pokemon.url).then(evalucia=>{
                      console.log(evalucia);
                      const divevol = document.createElement("div");
                      divevol.style = ` 
                          height:20vh; 
                         `
                      let nkar = evalucia.sprites.front_default
  
                      const imgevol = document.createElement("img");
                      imgevol.src = nkar;
                      imgevol.style = `
                          width: 60%;
                          height:60%;
                          border-radius: 500px;
                          border:solid 3px black;
                       
                      `
                      divevol.append(imgevol);
  
                      for (let elem in evalucia) {
                        if (elem === "name") {
                          const p = document.createElement("p");
                          p.innerText = elem + ":" + evalucia[elem];
                          divevol.append(p);
                        }
                      }
                      const p = document.createElement("label");
                      p.innerText = "#" + evalucia.id;
                      divevol.append(p);
                      evoldiv.append(divevol);
                      cont.append(evoldiv)
                      
                    })
                      
                  })
   
                  i++
              }
              console.log(arr);

              })
            })
            let nkar = pokemonnkar.sprites.front_default;
            const img = document.createElement("img");
            img.src = nkar;
            if (elem === "name") {
              const p = document.createElement("p");
              let x = document.createElement('p')
              x.innerText = '#' + pokemonnkar.id
              x.style = 'font-size: 1.5rem; color:grey; background:none;'


              p.innerText = el[elem].toUpperCase()
              cont.append(p)
              p.append(x)
              p.style = `
              background:none;
              font-size: 2rem;
              color:black;
              `
            }

            cont.style = `
                        width: 60%;
                        margin-top: 5vh;
                        display: flex;
                        flex-direction: column;
                      `;
            div.style = `
                        width: 100%;
                        height:50vh ;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        flex-wrap: wrap;
                      `
            img.style = `
                          width: 30%;
                          height:70% ; 
                      `


            div.append(img)

            cont.append(div);

          });
        } else {
          false;
        }
      }
    });
  });
  setInterval(() => {
    value = inputName.value;
    if (value !== value1 && value !== "" && value1 !== "") {
      value1 = value;
      cont.innerHTML = "";
      pokemon.forEach((el) => {
        getUrl(el.url).then((pokemonnkar) => {
          if (
            el.name.toUpperCase().startsWith(value.toUpperCase()) ||
            String(pokemonnkar.id).startsWith(value)
          ) {
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = pokemonnkar.sprites.front_default;

            div.append(img);

            for (let elem in el) {
              if (elem === "name") {
                const p = document.createElement("p");
                p.innerText = elem + ":" + el[elem];
                div.append(p);
              }
            }
            const p = document.createElement("label");
            p.innerText = "#" + pokemonnkar.id;
            div.append(p);
            cont.append(div);
          }
        });
      });
    }
  }, 500);
});
