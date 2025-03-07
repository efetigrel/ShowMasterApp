using FluentValidation;
using ShowMasterApp.Core.Dtos;

namespace ShowMasterApp.Core.Validators
{
    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            // Email doğrulama
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("E-posta adresi gereklidir.") // E-posta boş olamaz
                .EmailAddress().WithMessage("Geçerli bir e-posta adresi girin."); // Geçerli bir e-posta adresi olmalı

            // Şifre doğrulama
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Şifre gereklidir.") // Şifre boş olamaz
                .MinimumLength(6).WithMessage("Şifre en az 6 karakter olmalıdır."); // Şifre en az 6 karakter olmalı

            // ReturnUrl doğrulaması, isteğe bağlı bir alan olabilir
            RuleFor(x => x.ReturnUrl)
                .Matches(@"^https?:\/\/.*").WithMessage("Geçerli bir URL formatı girin.")
                .When(x => !string.IsNullOrEmpty(x.ReturnUrl)); // ReturnUrl boş değilse doğrulama yap
        }
    }
}
