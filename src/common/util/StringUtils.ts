export class StringUtils {
  public static sanitize(unsafeString: string) {
    return unsafeString;
  }

  public static isString(str: string) {
    return typeof str === 'string';
  }
}
