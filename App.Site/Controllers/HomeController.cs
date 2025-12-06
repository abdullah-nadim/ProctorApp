using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using App.Site.Models;

namespace App.Site.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        var viewModel = new HomeViewModel
        {
            IsAuthenticated = User.Identity?.IsAuthenticated == true,
            UserName = User.Identity?.Name,
            UserType = User.FindFirst("UserType")?.Value
        };

        return View(viewModel);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
