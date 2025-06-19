// add imports

describe("Movie controller", () => {
  it("should give a 400 error if movie already exists", () => {
    //Given

    //When
    const response = controller.postNewMovie(movie);
    
    //Then
    expect(response.status).toEqual(400);
    
  });
  
  it("should give a 400 error if there is no title", () => {
  });
  
  it("should give a 200 if movie is correctly saved", () => {});
});
