module.exports = {
    publicPath: (process.env.NODE_ENV === "production" ? "" : "/"),
    outputDir: (process.env.NODE_ENV === "production" ? "www" : "dist")
}