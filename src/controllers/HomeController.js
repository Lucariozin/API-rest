class HomeController {
  async index(req, res) {
    return res.json('HOME');
  }
}

export default new HomeController();
