const AUDIENCES = {
  authenticated: () => window.localStorage.getItem("auth") !== null,
  unauthenticated: () => window.localStorage.getItem("auth") === null,
  // define your custom audiences here as needed
};

export default function getAudiences() {
  return AUDIENCES;
}

export function getActiveAudiences() {
  const activeAudiences = [];
  const audiences = Object.keys(AUDIENCES);
  for (let index = 0; index < audiences.length; index++) {
    const audience = audiences[index];
    console.log(AUDIENCES[audience]())
    if(AUDIENCES[audience]()) {
      activeAudiences.push(audience);
    }
  }

  return activeAudiences;
}