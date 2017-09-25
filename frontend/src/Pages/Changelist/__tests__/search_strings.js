import { getSearchString,getFullUrl } from "../utils";

function getObj(search) {
  return {
    pathname: "/auth/users",
    search
  };
}
describe("getSearchString", () => {
  describe("should return original object", () => {
    it("when no search string", () => {
      const currentUrl = "/auth/users";
      let result = getSearchString(getObj(""), currentUrl);
      expect(result).toEqual(getObj(""));
      result = getSearchString(getObj("is_staff__exact=0"), currentUrl);
      expect(result).toEqual(getObj("is_staff__exact=0"));
    });

    describe("when currentUrl has searchString", () => {
      const currentUrl = "/auth/users?is_staff__exact=1";
      it("should return currentUrl search", () => {
        let result = getSearchString(getObj(""), currentUrl);
        expect(result).toEqual(getObj("is_staff__exact=1"));
      });
      it("and passed search has its own search params", () => {
        let result = getSearchString(getObj("is_active__exact=1"), currentUrl);
        expect(result).toEqual(getObj("is_staff__exact=1&is_active__exact=1"));
      });
      it("when currentUrl search has the same key as param search", () => {
        let result = getSearchString(
          getObj("is_staff__exact=0"),
          currentUrl,
          "is_staff__exact"
        );
        expect(result).toEqual(getObj("is_staff__exact=0"));
      });
    });
    describe("currentUrl with more complex search", () => {
      const currentUrl = "/auth/users?is_staff__exact=1&is_active__exact=1";
      it("should return currentUrl search", () => {
        let result = getSearchString(getObj(""), currentUrl);
        expect(result).toEqual(getObj("is_staff__exact=1&is_active__exact=1"));
      });
      it("and passed search has its own search params", () => {
        let result = getSearchString(getObj("is_active__exact=1"), currentUrl);
        expect(result).toEqual(getObj("is_staff__exact=1&is_active__exact=1"));
      });
      it("when currentUrl search has the same key as param search", () => {
        let result = getSearchString(
          getObj("is_staff__exact=0"),
          currentUrl,
          "is_staff__exact"
        );
        expect(result).toEqual(getObj("is_staff__exact=0&is_active__exact=1"));
      });
    });
  });
});

describe("getFullUrl",()=>{
  it("should return similar url", ()=>{
    expect(getFullUrl(getObj(""))).toEqual("/auth/users")
  })
  it("should return url with query parameter for one search query", ()=>{
    expect(getFullUrl(getObj("is_staff__exact=1"))).toEqual("/auth/users?is_staff__exact=1")
  })
  it("should return url with query parameter for more than one search query", ()=>{
    expect(getFullUrl(getObj("is_staff__exact=1&is_active__exact=1"))).toEqual(
      "/auth/users?is_staff__exact=1&is_active__exact=1"
    )
  })
})