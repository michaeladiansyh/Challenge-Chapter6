const User = require("../models").userGame;
const UserGameBiodata = require("../models").userGameBiodata;
const UserGameHistory = require("../models").userGameHistory;
const bcrypt = require("bcrypt");

module.exports = {
  allUser(req, res) {
    return User.findAll()
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: {
            users: data,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "fail",
          error: [err.message],
        });
      });
  },

  allHistory(req, res) {
    return UserGameHistory.findAll()
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: {
            histories: data,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "fail",
          error: [err.message],
        });
      });
  },

  async createUser(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
      const user = await User.create({
        username: req.body.username,
        password: hash,
      });
      return res.status(201).json({
        status: "Success Create User",
        data: {
          users: user,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail Create User",
        error: [error.message],
      });
    }
  },

  async createUserBiodata(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { username, password, fullName, address, email } = req.body;
    return await User.create({
      username: username,
      password: hash,
    })
      .then((user) => {
        UserGameBiodata.create({
          userId: user.get("id"),
          fullName: fullName,
          address: address,
          email: email,
        });
        res.status(200).redirect("/api/user");
      })
      .catch((err) => {
        res.status(422).json({
          status: "Failed Create new Detail User",
          errors: [err.message],
        });
      });
  },

  async createHistory(req, res) {
    const { score, userId } = req.body;
    try {
      const history = await UserGameHistory.create({
        score,
        userId,
      });

      return res.status(200).redirect("/api/history");
    } catch (error) {
      res.status(400).json({
        status: "fail",
        errors: [error.message],
      });
    }
  },
  async getUserBiodata(req, res) {
    try {
      const listbio = await User.findAll({
        include: [
          {
            model: UserGameBiodata,
            as: "UserBiodata",
          },
        ],
      });
      return res.render("biodatalist", {
        title: "Biodata List",
        layout: "../views/layouts/main-admin.ejs",
        users: listbio,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        errors: [error.message],
      });
    }
  },

  async getUsereBioById(req, res) {
    const idUser = req.params.id;
    const findById = await User.findOne({
      where: {
        id: idUser,
      },
      include: [
        {
          model: UserGameBiodata,
          as: "UserBiodata",
          where: {
            userId: idUser,
          },
        },
      ],
    });

    if (!findById) {
      res.status(400).json({
        message: "data not found",
      });
    } else {
      res.render("details", {
        title: "Halaman Details Dashboard",
        layout: "../views/layouts/main-details.ejs",
        data: findById,
      });
    }
  },
  async getHistoryById(req, res) {
    try {
      const idUser = req.params.id;
      const listhistoryid = await UserGameHistory.findAll({
        where: {
          userId: idUser,
        },
        include: [
          {
            model: User,
            as: "User",
          },
        ],
      });
      return res.render("detail-history", {
        title: "History List ID",
        layout: "../views/layouts/main-history.ejs",
        data: listhistoryid,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        errors: [error.message],
      });
    }

    /* const idUser = req.params.id;
    const findById = await User.findAll({
      where: {
        id: idUser,
      },
      include: [
        {
          model: UserGameHistory,
          as: "UserHistory",
          where: {
            userId: idUser,
          },
        },
      ],
    });
    if (!findById) {
      res.status(400).json({
        message: "data not found",
      });
    } else {
       res.render("detail-history", {
        title: "Halaman Details History Dashboard",
        layout: "../views/layouts/main-history.ejs",
        data: findById,
      }); 
      res.status(200).json({
        data: findById,
      }); */
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!user) {
        return res.status(400).json({
          status: "failed",
          message: `user id ${req.params.id} tidak ditemukan`,
        });
      } else {
        await User.destroy({
          where: {
            id: user.id,
          },
          individualHooks: true,
        });
        return res.status(200).redirect("/api/user").json({
          status: "success",
          message: "id sukses di delete",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Error",
      });
    }
  },
  async restoreUser(req, res) {
    try {
      await User.restore({
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      });
      return res
        .status(200)
        .redirect("/api/user")
        .json({
          status: "success",
          message: `Id dari ${req.params.id} berhasil di restore`,
        });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "error",
      });
    }
  },

  sign(req, res) {
    /*

      1. Find the user by email [X]
      2. Get the user's encrypted_password property [X]
      3. Compare req.body.password with the encrypted_password 
      4. Serve the response

      // ===================
      5. Create access token 
      // ===================

    */

    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((users) => {
        if (!users) {
          return res.status(401).json({
            status: "fail",
            errors: ["Username doesn't exist!"],
          });
        }

        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          users.password
        );

        if (!isPasswordCorrect) {
          return res.status(401).json({
            status: "fail",
            errors: ["Wrong password!"],
          });
        } else {
          res.status(200).redirect("/api/user");
        }
      })
      .catch((err) =>
        res.status(400).json({
          status: "fail",
          errors: [err.message],
        })
      );
  },
  loginadminIndex(req, res) {
    res.render("loginadmin", {
      layout: "../views/layouts/main-admin.ejs",
      title: "Login Admin Page",
      message: "",
    });
  },

  async updateUserBiodata(req, res) {
    const userId = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { username, password, fullName, address, email } = req.body;

    return await User.update(
      {
        username: username,
        password: hash,
      },
      {
        where: {
          id: userId,
        },
      }
    )
      .then((data) => {
        UserGameBiodata.update(
          {
            fullName: fullName,
            address: address,
            email: email,
          },
          {
            where: {
              userId: userId,
            },
          }
        );
        return res.status(200).redirect("/api/user");
      })
      .catch((err) => {
        res.status(422).json({
          status: "fail",
          errors: [err.message],
        });
      });
  },
  registerIndex(req, res) {
    res.render("register", {
      layout: "../views/layouts/main-admin.ejs",
      title: "Register Page",
      message: "",
    });
  },
  async adminIndex(req, res) {
    const userdt = await User.findAll();
    res.render("admin", {
      title: "Admin Dashboard",
      layout: "../views/layouts/main-admin.ejs",
      users: userdt,
    });
  },

  async historyIndex(req, res) {
    const userdt = await UserGameHistory.findAll();
    const historydt = await UserGameHistory.f;
    res.render("history", {
      title: "History Dashboard",
      layout: "../views/layouts/main-history.ejs",
      histories: userdt,
    });
  },
  async historyByIdIndex(req, res) {
    const userdt = await UserGameHistory.findAll();
    const historydt = await UserGameHistory.f;
    res.render("history", {
      title: "History Dashboard",
      layout: "../views/layouts/main-history.ejs",
      histories: userdt,
    });
  },

  createHistoryIndex(req, res) {
    res.render("create-history", {
      layout: "../views/layouts/main-admin.ejs",
      title: "Register History Page",
      message: "",
    });
  },
};
