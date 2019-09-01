using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.IO;
using System.Web.Script.Serialization;
using System.Net;
using System.Net.Http;
using System.Threading;

namespace WebApiForTheMvcGuy.Formatters
{
    public class JavaScriptSerializerFormatter : MediaTypeFormatter
    {
        public JavaScriptSerializerFormatter()
        {
            SupportedMediaTypes.Add(
              new MediaTypeHeaderValue("application/json"));
        }

        public override bool CanWriteType(Type type)
        {
            return true;
        }

        public override bool CanReadType(Type type)
        {
            return true;
        }

        public override Task<object> ReadFromStreamAsync(Type type, Stream readStream, HttpContent content, IFormatterLogger formatterLogger)
        {
            var task = Task.Factory.StartNew(() =>
            {
                using (var rdr = new StreamReader(readStream))
                {
                    var json = rdr.ReadToEnd();

                    JavaScriptSerializer ser = new JavaScriptSerializer();

                    object result = ser.Deserialize(json, type);

                    return result;
                }
            });

            return task;
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content, TransportContext transportContext)
        {
            var task = Task.Factory.StartNew(() =>
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();

                string json = ser.Serialize(value);

                byte[] buf = System.Text.Encoding.Default.GetBytes(json);
                writeStream.Write(buf, 0, buf.Length);
                writeStream.Flush();

            });

            return task;
        }
    }
}