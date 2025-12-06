namespace ManageResto.Core.Utilities
{
    public static class TextGenerator
    {
        public static string GeneratePassword(int length = 6)
        {
            if (length < 6)
                throw new ArgumentException("Password length must be at least 6 characters.");

            const string lower = "abcdefghijklmnopqrstuvwxyz";
            const string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string digits = "0123456789";
            const string special = "!@#$%^&*?";

            var random = new Random();

            // Ensure at least one of each required character type
            char upperChar = upper[random.Next(upper.Length)];
            char digitChar = digits[random.Next(digits.Length)];
            char specialChar = special[random.Next(special.Length)];

            // Fill the rest with random characters from all sets
            string allChars = lower + upper + digits;
            int remainingLength = length - 3;
            var remainingChars = Enumerable.Range(0, remainingLength)
                .Select(_ => allChars[random.Next(allChars.Length)]);

            // Combine and shuffle
            var passwordChars = new[] { upperChar, digitChar, specialChar }
                .Concat(remainingChars)
                .OrderBy(_ => random.Next()) // Shuffle
                .ToArray();

            return new string(passwordChars);
        }

        public static string GeneratePIN(int length = 4)
        {
            if (length < 4)
                throw new ArgumentException("Password length must be at least 6 characters.");

            const string digits = "0123456789";
            Random random = new Random();
            char[] pin = Enumerable.Range(0, length)
                .Select(_ => digits[random.Next(digits.Length)])
                .ToArray();

            return new string(pin);
        }
    }
}
