export function decorator(ctor: new (...args: any) => any) {
  console.log('This is the constructor');
  console.log(ctor);
  console.log('That was the constructor');
}
