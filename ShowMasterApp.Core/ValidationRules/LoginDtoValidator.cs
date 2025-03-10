using FluentValidation;
using ShowMasterApp.Core.Dtos;

namespace ShowMasterApp.Core.Validators
{
    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("E-posta adresi gereklidir.")
                .EmailAddress().WithMessage("Geçersiz e-posta adresi.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Şifre gereklidir.");
        }
    }
}
