package router

import (
	"github.com/Pauloo27/shop/controllers/auth"
	"github.com/Pauloo27/shop/controllers/users"
	"github.com/gofiber/fiber/v2"
)

func RouteFor(app *fiber.App) {
	// Auth
	app.Post("/v1/login", requireGuest, auth.Login)
	app.Post("/v1/register", requireAuth, requireAdmin, auth.Register)

	// User
	app.Put("/v1/users/", requireAuth, users.Update)
	//app.Put("/v1/users/:id", requireAuth, requireAdmin, users.UpdateOther)
}
