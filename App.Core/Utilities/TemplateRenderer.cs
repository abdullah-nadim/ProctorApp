using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ManageResto.Core.Utilities
{
    public class TemplateRenderer
    {
        private readonly string _templateDirectory;

        public TemplateRenderer(string templateDirectory)
        {
            _templateDirectory = templateDirectory;
        }

        public string RenderTemplate(string templateName, object model)
        {
            var templatePath = Path.Combine(_templateDirectory, templateName);
            if (!File.Exists(templatePath))
            {
                throw new FileNotFoundException($"Template file not found: {templateName}");
            }

            var template = File.ReadAllText(templatePath);
            return ReplacePlaceholders(template, model);
        }

        private string ReplacePlaceholders(string template, object model)
        {
            var properties = model.GetType().GetProperties();
            var result = template;

            foreach (var property in properties)
            {
                var value = property.GetValue(model)?.ToString() ?? string.Empty;
                var placeholder = $"{{{{{property.Name}}}}}";
                result = result.Replace(placeholder, value);
            }

            // Replace Year placeholder if not provided in model
            if (!properties.Any(p => p.Name == "Year"))
            {
                result = result.Replace("{{Year}}", DateTime.Now.Year.ToString());
            }

            return result;
        }
    }
}
