let a = 1;
async function d() {
    await new Promise((reject, resolve) => {
        setTimeout(resolve, 1000);
    })
}
d();
