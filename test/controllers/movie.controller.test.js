const { postNewMovie } = require('/controllers/movie.controllers')
const Movie = require('/models/movies.model')
jest.mock('/models/movies.model.js')

describe("Movie controller", () => {

 it("should give a 400 error if there is no title", async () => {
  //Given
  const req = {body : {title : ''}}
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  //When
  await postNewMovie(req, res)
  //Then
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Title is required"})
});
it("should give a 400 error if movie already exists", async () => {
  //Given
  const moviesTitles = await Movie.find({}, "title").lean();
  const titlesArray = moviesTitles.map(movie => movie.title.toLowerCase());
  const req = {body : {title : titlesArray}}
  //When
  await postNewMovie(req, res)
  //Then
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Esa peli ya existe"})
})

// 
//   it("should give a 400 error if movie already exists", () => {
//     //Given

//     //When
//     const response = postNewMovie(req, res);

//     //Then
//     expect(response.status).toEqual(400);

//   });

 


//   it("should give a 200 if movie is correctly saved", () => { });
});
