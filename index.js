import { Transform } from "node:stream";
import { optimize } from "svgo";
import PluginError from "plugin-error";

export default function () {
  const stream = new Transform({ objectMode: true });
  stream._transform = async function (file, enc, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(new PluginError("gulp-svgo", "Streaming is not supported"));
      return;
    }

    if (file.isBuffer()) {
      try {
        const source = file.contents.toString("utf8");
        const { data } = await optimize(source);
        file.contents = Buffer.from(data);
        this.push(file);
        callback();
      } catch (error) {
        if (error.name === "SvgoParserError") {
          callback(new PluginError("gulp-svgo", error.toString()));
        } else {
          callback(new PluginError("gulp-svgo", error.message));
        }
      }
    }
  };
  return stream;
}
