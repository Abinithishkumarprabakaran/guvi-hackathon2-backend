import express from "express";
import { getAllMovies, getMoviesbyId, createMovies, deleteMoviesbyId, updateMoviesById } from "../service/movies.service.js";
const router = express.Router();

router.get("/", async function (request, response) {

  const res = await getAllMovies()

  response.send(res);
});

router.get("/:id", async function (request, response) {
  const {id} = request.params;
  console.log(id);

  const movie = await getMoviesbyId(id)

  movie ? response.send(movie) : response.status(404).send({message : "Movie not Found"});
});

router.post("/",express.json(), async function (request, response) {
  const data = request.body;
  console.log(data);

  const res = await createMovies(data)

  response.send(res);
})

// Delete
router.delete("/:id", async function (request, response) {
  const {id} = request.params;
  console.log(id);
  // db.movies.deleteOne({ id: "1000" })

  const result = await deleteMoviesbyId(id)

  console.log(result)
  result.deletedCount >= 1
   ? response.send({ message : "Movie Deleted Successfully" }) 
   : response.status(404).send({message : "Movie not Found"});
});

// Update
router.put("/:id",express.json(), async function (request, response) {
  const {id} = request.params;
  const data = request.body;
  console.log(data);
  console.log(id);

  const result = await updateMoviesById(id, data)

  response.send(result);
});

export default router;


