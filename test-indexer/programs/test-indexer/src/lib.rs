use anchor_lang::prelude::*;

declare_id!("JBnjQhNKhjPJ2tQUdsCsj7z3ZVV4zco3p1h89mZfP4u4");

#[program]
pub mod test_indexer {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>, data: u64) -> Result<()> {
        emit!(SpecialEvent { data });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[event]
pub struct SpecialEvent {
    data: u64,
}
