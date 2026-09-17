import type * as Monaco from "monaco-editor";
import cFamily from "./c-family";

export default (monaco: typeof Monaco) => cFamily(monaco, "objcpp");
