using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.DependencyInjection;

namespace <%= rootNamespace %>
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // MVC for Web-APIs
            app.UseMvc();

            // Serve static files from configured webroot.
            app.UseFileServer();

            // Note: You can configure additional static file mappigs, e.g. for bower_components
            //       This can be useful during dev time. In production you will most likely
            //       serve a minified and bundled version. Example:
            //var staticFileServerOptions = new Microsoft.AspNet.StaticFiles.FileServerOptions()
            //{
            //    RequestPath = new Microsoft.AspNet.Http.PathString("/bower_components"),
            //    FileProvider = new Microsoft.AspNet.FileProviders.PhysicalFileProvider(env.MapPath("../bower_components"))
            //};
            //
            //app.UseFileServer(staticFileServerOptions);
        }
    }
}
