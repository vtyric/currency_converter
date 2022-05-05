using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Core.Helpers;

public static class CryptographyHelper
{
    public static string GetSalt()
    {
        var salt = new byte[128 / 8];
        using var rngCsp = new RNGCryptoServiceProvider();
        rngCsp.GetNonZeroBytes(salt);

        return Convert.ToBase64String(salt);
    }


    public static string GetHashedPassword(string salt, string password) =>
        Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: Convert.FromBase64String(salt),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8
        ));
}